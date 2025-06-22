import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { api } from "../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function NotasAluno({ route, navigation }: any) {
  const { aluno } = route.params;
  const [materias, setMaterias] = useState([]);
  const [notas, setNotas] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMaterias = async () => {
    const res = await api.get(`/materias/turma/${aluno.turma}`);
    setMaterias(res.data);
  };

  const fetchNotas = async () => {
    const res = await api.get(`/notas/aluno/${aluno.id}`);
    const mapaNotas: any = {};
    res.data.forEach((nota: any) => {
      mapaNotas[nota.materiaId] = { id: nota.id, valor: nota.nota.toString() };
    });
    setNotas(mapaNotas);
  };

  const loadData = async () => {
    setLoading(true);
    await fetchMaterias();
    await fetchNotas();
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (materiaId: number) => {
    const notaAtual = notas[materiaId];

    if (!notaAtual || notaAtual.valor === "") {
      Alert.alert("Atenção", "Digite uma nota de 0 a 10.");
      return;
    }

    const valor = Number(notaAtual.valor);

    if (isNaN(valor) || valor < 0 || valor > 10) {
      Alert.alert("Atenção", "Nota inválida. Use valores de 0 a 10.");
      return;
    }

    try {
      if (notaAtual.id) {
        await api.put(`/notas/${notaAtual.id}`, { nota: valor });
      } else {
        await api.post(`/notas`, {
          alunoId: aluno.id,
          materiaId,
          nota: valor,
        });
      }

      Alert.alert("Sucesso", "Nota salva com sucesso!");
      fetchNotas();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a nota.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4DB12F" />
        <Text style={{ marginTop: 10, color: "#475569" }}>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header com seta de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.title}>Notas de {aluno.nome}</Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={materias}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.materia}>{item.nome}</Text>

            <TextInput
              style={styles.input}
              placeholder="0-10"
              keyboardType="numeric"
              value={notas[item.id]?.valor || ""}
              onChangeText={(text) =>
                setNotas((prev) => ({
                  ...prev,
                  [item.id]: { ...prev[item.id], valor: text },
                }))
              }
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSave(item.id)}
            >
              <Ionicons name="save" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#4DB12F",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  materia: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "600",
  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1.5,
    borderColor: "#4DB12F",
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: "#4DB12F",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
