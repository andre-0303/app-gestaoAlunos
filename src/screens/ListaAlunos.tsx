import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { api } from "../services/api";

export default function ListaAlunos({ route, navigation }: any) {
  const { turma } = route.params;
  const [alunos, setAlunos] = useState([]);

  const fetchAlunos = async () => {
    const res = await api.get(`/alunos/turma/${turma}`);
    setAlunos(res.data);
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Confirmar", "Deseja remover o aluno?", [
      { text: "Cancelar" },
      {
        text: "Deletar",
        onPress: async () => {
          await api.delete(`/alunos/${id}`);
          fetchAlunos();
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchAlunos);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("FormAluno", { turma })}
      >
        <Text style={styles.addButtonText}>Cadastrar Novo Aluno</Text>
      </TouchableOpacity>

      <FlatList
        data={alunos}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>Idade: {item.idade}</Text>
            <Text style={styles.info}>Email: {item.email}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate("FormAluno", { aluno: item })}
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.actionText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  addButton: {
    backgroundColor: "#4DB12F",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: "#4DB12F",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  editButton: {
    backgroundColor: "#fcb900",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#ef4444", // Vermelho para deletar
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
