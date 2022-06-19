import React from "react";
import { Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";

function DateTime({ title, setBirthday, value }) {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [text, setText] = React.useState("");
  const handleDataTimePicker = (e, selectedDate) => {
    setShow(!show);
    const currentDate = selectedDate || date;
    let tempDate = new Date(currentDate);
    setDate(tempDate);
    let month =
      tempDate.getMonth() > 8
        ? tempDate.getMonth() + 1
        : `0${tempDate.getMonth() + 1}`;
    console.log(month);
    let fDate = tempDate.getFullYear() + "-" + month + "-" + tempDate.getDate();
    setText(fDate);
    setBirthday(fDate);
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 18, marginBottom: 5 }}>{title}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1,
            backgroundColor: COLORS.light,
            paddingHorizontal: 20,
            paddingVertical: 15,
            fontSize: 18,
            borderRadius: 10,
          }}
        >
          {value}
        </Text>

        <Icon
          style={{ marginHorizontal: 15 }}
          name="calendar-today"
          onPress={() => setShow(!show)}
          size={40}
        />
      </View>
      {show && (
        <DateTimePicker
          textID="dataTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDataTimePicker}
        />
      )}
    </View>
  );
}

export default DateTime;
