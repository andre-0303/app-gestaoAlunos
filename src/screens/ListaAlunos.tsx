import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { api } from "../services/api";
import { Ionicons } from "@expo/vector-icons";


export default function ListaAlunos({ route, navigation }) {
  const { turma } = route.params;
  const [alunos, setAlunos] = useState([]);

  const fetchAlunos = async () => {
    const res = await api.get(`/alunos/turma/${turma}`);
    setAlunos(res.data);
  };

  const handleDelete = async (id) => {
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#1e293b" style={{marginBottom: '24px'}} />
        </TouchableOpacity>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum aluno cadastrado na turma.</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.turma}>{turma.replace("_", " ")}</Text>
            </View>

            <Text style={styles.info}>🎂 Idade: {item.idade}</Text>
            <Text style={styles.info}>📧 Email: {item.email}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.notasButton}
                onPress={() => navigation.navigate("NotasAluno", { aluno: item })}
              >
                <Text style={styles.actionText}>Notas</Text>
              </TouchableOpacity>

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

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("FormAluno", { turma })}
      >
        <Text style={styles.floatingButtonText}>+ Novo Aluno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#64748b",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#4DB12F",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  turma: {
    backgroundColor: "#4DB12F",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  info: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
  notasButton: {
    backgroundColor: "#4DB12F",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#fcb900",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  floatingButton: {
    backgroundColor: "#4DB12F",
    position: "absolute",
    bottom: 25,
    right: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
