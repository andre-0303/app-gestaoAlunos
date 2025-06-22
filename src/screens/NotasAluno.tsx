import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { api } from "../services/api";

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas de {aluno.nome}</Text>

      <FlatList
        data={materias}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.materia}>{item.nome}</Text>

            <TextInput
              style={styles.input}
              placeholder="0 - 10"
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
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 6,
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
    borderWidth: 1,
    borderColor: "#4DB12F",
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#fcb900",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
