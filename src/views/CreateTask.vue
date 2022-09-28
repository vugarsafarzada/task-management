<template>
    <div id="create-task">
        <div class="task-content">
            <input v-model="taskContent" type="text" class="task-subject-input" placeholder="Task subject">
            <ul class="tag-list">
                <li :style="{'color': tag.color, 'border': '1px solid ' + tag.color}" class="tag-item text-bold"
                    v-for="tag in tagList" :key="tag.name">
                    <i :style="{'color': tag.color}" class="fi fi-sr-tags icon-custom-style"></i> {{tag.name}}
                </li>
            </ul>
        </div>
        <div class="buttons-group flex-row-space-between-center">
            <add-tags @tagList="getTagList"></add-tags>
            <div class="create-task-buttons">
                <button class="cancel-btn">Cancel</button>
                <button :class="{'disable-btn': !taskContent.trim().length}" class="add-btn">Add task</button>
            </div>
        </div>
    </div>
</template>

<script>
import AddTags from '@/components/AddTags'

export default {
    name: "CreateTask",
    components: { AddTags },
    data() {
        return {
            taskContent: "",
            tagList: [],
        }
    },
    methods: {
        getTagList(data) {
            this.tagList = data.map(item => {
                return { name: item, color: this.randomRgb() }
            });
        },
        randomRgb() {
            var o = Math.round, r = Math.random, s = 255;
            return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
        },
        createNewTask() {
        }
    }
}
</script>

<style scoped>
#create-task {
    width: 500px;
}

#create-task .task-subject-input {
    height: 30px;
    width: 500px;
    font-size: 20px;
    background-color: transparent;
}

#create-task .buttons-group {
    margin-top: 50px;
}

#create-task .create-task-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

#create-task .create-task-buttons .add-btn {
    background-color: var(--color-main-blue);
    color: var(--color-main-white);
}

#create-task .tag-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    list-style-type: none;
}

#create-task .tag-list .tag-item {
    padding: 5px 10px;
    margin: 0 5px 5px 0;
    border: 1px solid var(--color-main-grey2);
    border-radius: 10px;
}

#create-task .tag-list li:hover {
    border: 1px solid var(--color-main-grey2) !important;
    color: var(--color-main-black) !important;
    background-color: var(--color-main-white);
    cursor: pointer;
}
</style>