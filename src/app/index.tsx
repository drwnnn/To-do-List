import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [items, setItems] = useState<TodoItem[]>([]);

  const [inputText, setInputText] = useState("");

  const addItem = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newItem: TodoItem = {
      id: Date.now().toString(),
      text: inputText.trim(),
      completed: false,
    };

    setItems([...items, newItem]);
    setInputText("");
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemTextContainer}
        onPress={() => toggleItem(item.id)}
      >
        <Text
          style={[
            styles.itemText,
            item.completed && styles.completedText,
          ]}
        >
          {item.completed ? "✓ " : "○ "}
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addItem}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.countText}>
        Tasks: {items.length}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#333333",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 8,
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  countText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dddddd",
  },

  itemTextContainer: {
    flex: 1,
  },

  itemText: {
    fontSize: 17,
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#888888",
  },

  deleteButton: {
    backgroundColor: "#dddddd",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },

  deleteText: {
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#777777",
  },
});