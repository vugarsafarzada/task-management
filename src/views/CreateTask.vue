<template>
    <div id="create-task">
        <div class="task-content">
            <input :maxlength="maxContentLength" v-model="taskContent" type="text" class="task-subject-input"
                placeholder="Tapşırıq mətni">
            <div style="float: right">{{taskContent.length}}/{{maxContentLength}}</div>
            <div style="float: left; font-size: 12px">
                Qeyd: Əgər eyni anda birdən çox tapşırıq yaratmaq istərsəniz, tapşırıq mətnləri arasına vergül əlavə
                etməyiniz kifayətdir!
            </div>
            <ul class="tag-list">
                <li :style="{'color': '#' + tag.color, 'border': '1px solid ' +  '#' + tag.color}"
                    class="tag-item text-bold" v-for="tag in tagList" :key="tag.name">
                    <i :style="{'color': '#' + tag.color}" class="fi fi-sr-tags icon-custom-style"></i> {{tag.name}}
                </li>
            </ul>
        </div>
        <div class="buttons-group flex-row-space-between-center">
            <add-tags :clearInput="clearTags" @tagList="getTagList"></add-tags>
            <div class="create-task-buttons">
                <button class="cancel-btn" @click="clearInputs">Ləğv et</button>
                <button @click="createNewTask" :class="{'disable-btn': !taskContent.trim().length}" class="add-btn">
                    Əlavə et
                </button>
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
            taskData: {},
            taskContent: "",
            tagList: [],
            clearTags: false,
            maxContentLength: 120,
        }
    },
    methods: {
        getTagList(data) {
            this.tagList = data.map(item => {
                return { name: item, color: this.randomRgb() }
            });
        },
        createNewTask() {
            if (this.taskContent.trim().length) {
                this.taskData = {
                    subject: this.taskContent,
                    tags: this.tagList
                };
                if (this.taskData.tags.length > 0) {
                    this.taskData.tags.forEach(tag => {
                        tag.name = tag.name?.trim()
                        this.setLocalStorage(tag, `${this.taskData.subject} -;- false`)
                    })
                } else {
                    this.setLocalStorage({ name: 'non_tag' }, `${this.taskData.subject} -;- false`);
                }
                this.clearInputs();
                window.alert('Yeni tapşırıq əlavə edildi!')
            }
        },
        setLocalStorage(key, data) {
            if (key.name) {
                let oldData = localStorage.getItem(key.name);
                if (!oldData) {
                    localStorage.setItem(key.name, [data]);
                    this.setLocalStorage({ name: 'all_tags' }, key.name);
                } else {
                    oldData = oldData.split(',');
                    let newData = [...new Set([...oldData, ...new Set([data])])];
                    localStorage.setItem(key.name, newData);
                }
            }
        },
        clearInputs() {
            this.taskData = {};
            this.taskContent = "";
            this.tagList = [];
            this.clearTags = !this.clearTags;
        },
        randomRgb() {
            return Math.floor(Math.random() * 16777215).toString(16);
        },
    }
}
</script>

<style scoped>
#create-task .task-subject-input {
    height: 30px;
    width: 100%;
    font-size: 20px;
    background-color: transparent;
    border-bottom: 2px solid var(--color-main-grey2);
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