import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { api } from "../services/api";

export default function FormAluno({ route, navigation }: any) {
  const turma = route.params?.turma || route.params?.aluno?.turma;
  const aluno = route.params?.aluno;

  const [nome, setNome] = useState(aluno?.nome || "");
  const [idade, setIdade] = useState(String(aluno?.idade || ""));
  const [email, setEmail] = useState(aluno?.email || "");

  const handleSubmit = async () => {
    if (!nome || !idade || !email) {
      Alert.alert("Preencha todos os campos");
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
      Alert.alert("Erro", error.response?.data?.error || "Erro desconhecido");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {aluno ? "Atualizar Aluno" : "Cadastrar Aluno"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    gap: 15,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "#065f46", // Verde escuro para texto
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#4DB12F", // Borda verde principal
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#fcb900", // Laranja vibrante
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "bold",
  },
});
