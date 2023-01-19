import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function AppRoutes(app: FastifyInstance) {
  app.post("/habits", async (request, response) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    // startOf -> zera as horas e segundos
    // toDate -> Retorna Date do javascript
    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  app.get("/day", async (request, response) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    // localhost:3333/day?date=yyyy-MM-dd
    const { date } = getDayParams.parse(request.query);
    const parseDate = dayjs(date).startOf("day");
    const weekDay = parseDate.get("day");

    console.log(date);
    console.log(weekDay);

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parseDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => {
      return dayHabit.habit_id;
    });

    return {
      possibleHabits,
      completedHabits,
    };
  });

  app.patch("/habits/:id/toggle", async (request, response) => {
    const toggleHabitsParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitsParams.parse(request.params);

    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });

  app.get("/summary", async (request, response) => {
    // retorna resumo
    // [ {date: 19/01, amount: 5, completed: 1 } , {date: 20/01, amount: 2, completed: 2 } ]
    // Query mais complexa, mais condições, relacionamentos => SQL na mao (RAW)
    // Prisma ORM: Quando começamos a escrever RAW SQL na mao, o orm passa a funciona somente no banco de dados especifico =>  Nesse caso aqui no SQLite

    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast (count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT 
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE 
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D 
    `;

    return summary;
  });
}
