<template>
    <div
        class="task"
        draggable
        @dragstart="pickupTask($event, taskIndex, columnIndex)"
        @click="goToTask(task)"
        @dragover.prevent
        @dragenter.prevent
        @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
    >
    <span class="w-full flex-no-shrink font-bold">
        {{task.name}}
    </span>
    <p v-if="task.description"
       class="w-full flex-no-shrink mt-1 text-xs">
        {{task.description}}
    </p>
    </div>
</template>

<script>
    import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

    export default {
        mixins: [movingTasksAndColumnsMixin],

        props: {
            task: {
                type: Object,
                required:true, 
            }, 
            taskIndex: {
                type:Number,
                required:true
            },
        },
        methods: {
            goToTask (task) {
              this.$router.push({ name: 'task', params: { id: task.id } })
            }, 
    
            pickupTask (event, taskIndex, fromColumnIndex) {
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.setData('from-task-index', taskIndex)
                event.dataTransfer.setData('from-column-index', fromColumnIndex)
                event.dataTransfer.setData('type', 'task')
            },
        }
    }
</script>

<style lang="css">

</style>