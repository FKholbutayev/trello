<template>
<div class="board">
    <div class="flex flex-row items-start">

    <BoardColumn
      v-for="(column, columnIndex) of board.columns"
      :key="columnIndex"
      :column = "column"
      :columnIndex = "columnIndex"
      :board ="board"
    />

    <div class="column flex">
      <input
        class="p-2 mr-2 flex-grow"
        placeholder="Add new column"
        v-model="newColumnName"
        @keyup.enter="createColumn"/>
    </div>
    </div>
    <div
        class="task-bg"
        v-if="isTaskOpen"
        @click.self="close">
    <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn'

export default {
  components: {
    BoardColumn
  },

  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    close () {
      this.$router.push({ name: 'board' })
    },

    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-light h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
