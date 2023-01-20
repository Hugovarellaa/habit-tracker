import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { ProgressBar } from "../components/ProgressBar";

interface Params {
  date: string;
}

export function Habit() {
  const router = useRoute();
  const { date } = router.params as Params;
  const parsedDate = dayjs(date);

  const dayOfWeek = parsedDate.format("dddd");
  const dayOfMonth = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl">{dayOfMonth}</Text>

        <ProgressBar progress={45} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de aguá" />
          <Checkbox title="Exercício" checked />
        </View>
      </ScrollView>
    </View>
  );
}
