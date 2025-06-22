import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { api } from "../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function FormAluno({ route, navigation }: any) {
  const turma = route.params?.turma || route.params?.aluno?.turma;
  const aluno = route.params?.aluno;

  const [nome, setNome] = useState(aluno?.nome || "");
  const [idade, setIdade] = useState(String(aluno?.idade || ""));
  const [email, setEmail] = useState(aluno?.email || "");

  const handleSubmit = async () => {
    if (!nome || !idade || !email) {
      Alert.alert("⚠️ Atenção", "Preencha todos os campos corretamente.");
      return;
    }

    const data = { nome, idade: Number(idade), turma, email };

    try {
      if (aluno) {
        await api.put(`/alunos/${aluno.id}`, data);
      } else {
        await api.post("/alunos", data);
      }
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.response?.data?.error || "Ocorreu um erro inesperado."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {aluno ? "Editar Aluno" : "Cadastrar Aluno"}
        </Text>
        <View style={{ width: 26 }} /> {/* Espaço para balancear o ícone */}
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome"
          style={styles.input}
        />

        <Text style={styles.label}>Idade:</Text>
        <TextInput
          value={idade}
          onChangeText={setIdade}
          placeholder="Digite a idade"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email@aluno.ce.gov.br"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {aluno ? "Atualizar Aluno" : "Cadastrar Aluno"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    color: "#065f46", // Verde escuro
    fontWeight: "600",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#4DB12F",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#fcb900", // Amarelo vibrante
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    elevation: 4,
    marginTop: 10,
  },
  buttonText: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "bold",
  },
});
