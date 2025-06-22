import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/cropped-cropped-logo-11anos-epdjmm-2022.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>EEEP Dep. José Maria Melo</Text>
      <Text style={styles.subTitle}>Gestão de Alunos - Informática</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007aff" }]}
          onPress={() => navigation.navigate("ListaAlunos", { turma: "Infor_G8" })}
        >
          <Text style={styles.buttonText}>Infor G8</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007aff" }]}
          onPress={() => navigation.navigate("ListaAlunos", { turma: "Infor_G9" })}
        >
          <Text style={styles.buttonText}>Infor G9</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007aff" }]}
          onPress={() => navigation.navigate("ListaAlunos", { turma: "Infor_G10" })}
        >
          <Text style={styles.buttonText}>Infor G10</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.footerButton, { backgroundColor: "#fcb900" }]}
        onPress={() => Alert.alert("Sistema desenvolvido para EEEP Dep. José Maria Melo")}
      >
        <Text style={styles.footerButtonText}>Sobre o App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#334155",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    gap: 15,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 50,
    elevation: 3,
  },
  footerButtonText: {
    color: "#1e293b",
    fontSize: 14,
    fontWeight: "600",
  },
});
