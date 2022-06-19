import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import FormInput from "../components/FormInput";
import Button, { SecondaryButton } from "../components/Button";
import emailApi from "../../api/emailApi";
import ModalComponent from "../components/ModalComponent";

const SHIPPING_FEE = 0;

const ContactScreen = ({ navigation }) => {
  const [subject, setSubject] = React.useState("");
  const [content, setContent] = React.useState("");
  const isEnabled = () => subject !== "" && content !== "";

  const [showModal, setShowModal] = React.useState(false);
  const [modal, setModal] = React.useState({
    title: "Gửi mail thành công",
    icon: "check-circle-outline",
    textBtn: "Đóng",
    color: COLORS.green,
  });

  const handleSubmit = () => {
    const sendMail = async () => {
      try {
        const result = await emailApi.sendMail(subject, content);
        setShowModal(!showModal);
      } catch (error) {
        console.log(error, "senMail");
      }
    };
    sendMail();
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        marginTop: 30,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Liên hệ</Text>
        </View>
      </TouchableOpacity>
      {/* Cart List */}
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <FormInput
          lable="Tiêu đề"
          placeholder=""
          onChange={(value) => {
            setSubject(value);
          }}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Icon
                style={{
                  color: subject !== "" ? COLORS.green : COLORS.red,
                }}
                name={subject !== "" ? "check-circle-outline" : "warning"}
                size={20}
              />
            </View>
          }
        />
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>Nội dung</Text>
          <TextInput
            multiline
            numberOfLines={10}
            style={{
              height: 200,
              textAlignVertical: "top",
              backgroundColor: COLORS.light,
              fontSize: 18,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 20,
            }}
            onChangeText={(value) => setContent(value)}
          />
        </View>
        {/* <SecondaryButton
          title="Gửi"
          btnContainerStyle={{
            backgroundColor: COLORS.primary,
            width: 100,
            paddingVertical: 10,
            borderRadius: 20,
            marginTop: 20,
          }}
          labelStyle={{ color: COLORS.white }}
          onPress={() => handleSubmit()}

        /> */}
        <Button
          title="Gửi"
          onPress={() => handleSubmit()}
          disabled={isEnabled() ? false : true}
        />
      </ScrollView>
      <ModalComponent
        showModal={showModal}
        onPress={() => {
          setShowModal(!showModal);
          navigation.navigate("Home");
        }}
        title={modal.title}
        icon={modal.icon}
        textBtn={modal.textBtn}
        color={modal.color}
        // styleIcon
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default ContactScreen;
