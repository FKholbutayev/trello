export default {
    props: {
        column: {
            type: Object,
            required: true
        },
        columnIndex: {
            type: Object,
            required: true
        },
        board: {
            type: Object,
            required: true
        }
    },
    methods: {
        moveTaskOrColumn(event, toTasks, toColumnIndex, toTaskIndex) {
            const type = event.dataTransfer.getData('type')
            if (type === 'task') {
                this.moveTask(event, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
            } else {
                this.moveColumn(event, toColumnIndex)
            }
        },
        moveTask(event, toTasks, toTaskIndex) {
            const fromColumnIndex = event.dataTransfer.getData('from-column-index')
            const fromTasks = this.board.columns[fromColumnIndex].tasks
            const fromTaskIndex = event.dataTransfer.getData('from-task-index')

            this.$store.commit('MOVE_TASK', {
                fromTasks,
                fromTaskIndex,
                toTasks,
                toTaskIndex
            })
        },

        moveColumn(event, toColumnIndex) {
            const fromColumnIndex = event.dataTransfer.getData('from-column-index')
            this.$store.commit('MOVE_COLUMN', {
                fromColumnIndex,
                toColumnIndex
            })
        },
    }
}