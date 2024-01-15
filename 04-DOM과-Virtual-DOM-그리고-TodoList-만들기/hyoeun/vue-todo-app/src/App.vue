<template>
  <div id="app">
    <TodoInsertInput></TodoInsertInput>
    <TodoInsertButton></TodoInsertButton>
    <AllDeleteButton></AllDeleteButton>
    <TodoItemList></TodoItemList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import AllDeleteButton from "./components/TodoInsert/AllDeleteButton.vue";
import TodoInsertButton from "./components/TodoInsert/TodoInsertButton.vue";
import TodoInsertInput from "./components/TodoInsert/todoinsertinput.vue";
import TodoItemList from "./components/TodoList/TodoItemList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  components: {
    AllDeleteButton: AllDeleteButton,
    TodoInsertButton: TodoInsertButton,
    TodoInsertInput: TodoInsertInput,
    TodoItemList: TodoItemList,
    TodoFooter: TodoFooter,
  },
};
</script>
