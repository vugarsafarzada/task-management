<template>
    <div id="all-tasks-container">
        <div class="header-section flex-row-start-center">
            <h2 v-if="allTaskWithTag.length">Bütün tapşırıqlar: ({{allTaskWithTag.length}})</h2>
            <h2 v-else>
                Tapşırıq siyahısı boşdu,
                <router-link to="/create">
                    <b>
                        <u style="color:var(--color-main-red)">
                            yeni tapşırıq yarat!
                        </u>
                        <i style="color:var(--color-main-red); right: 5px"
                            class=" fi fi-rr-rocket-lunch icon-custom-style"></i>
                    </b>
                </router-link>
            </h2>
        </div>
        <ul class="tasks-list no-select">
            <li class="task-item" v-for="(item, index) in allTaskWithTag" :key="index">
                <div class="task-header flex-row-center-flex-start">
                    <div @click="editMode = index" v-if="editMode !== index" class="task-title">
                        <i class="fi fi-ss-thumbtack icon-custom-style"></i>
                        <h3>{{item.task.split(splitterKey)[0]}}</h3>
                    </div>
                    <div v-else class="task-title-edit">
                        <i class="fi fi-ss-trash icon-custom-style"
                            @click="deleteTask(item?.task?.split(splitterKey)[0])"></i>
                        <input type="text" name="Task name" v-model="editedTask.name">
                    </div>
                    <div @click="editMode = index" v-if="editMode !== index" class="task-status flex-row-center-center"
                        :style="{'background-color': !checkStatus(item.task) ? 'var(--color-main-red)': 'var(--color-main-green)'}">
                        Status:&nbsp;
                        <span class="text-bold">
                            {{!checkStatus(item.task) ? 'Tamam deyil' : 'Tamamlandı'}}
                        </span>
                    </div>
                    <div v-else class="task-status-edit flex-row-center-center">
                        <input type="checkbox" v-model="editedTask.status">
                        <span class="text-bold">
                            {{editedTask.status ? 'Tamamlandı': "Tamam deyil"}}
                        </span>
                    </div>
                </div>
                <ul v-if="editMode !== index" class="tags-list">
                    <li class="tag-item" v-for="(item, index) in item.tags" :key="index">
                        <div v-if="item !== 'non_tag'">
                            <i class="fi fi-sr-tags icon-custom-style"></i>
                            {{item}} &nbsp;
                        </div>
                    </li>
                </ul>
                <ul v-else class="tags-list-edit flex-row-space-between-center">
                    <div class="tag-edit-section flex-row-start-center">
                        <li @click="deleteTag(tag_item)" class="tag-item"
                            v-for="(tag_item, tag_index) in editedTask.tagList" :key="tag_index">
                            <div v-if="tag_item !== 'non_tag'">
                                <i class="fi fi-rr-trash icon-custom-style"></i>
                                {{tag_item}} &nbsp;
                            </div>
                        </li>
                        <li class="tag-item">
                            <div @click="addNewTagTrigger = true" v-if="!addNewTagTrigger">
                                <i class="fi fi-br-add icon-custom-style"></i>
                                Yeni teq
                            </div>
                            <div class="add-new-tag-edit" v-else>
                                <input title="'Enter' yada 'Vergüldən' istifadə edin" @blur="addNewTagTrigger = false"
                                    ref="focusHere" type="text" @keypress="addNewTagHandler" v-model="newTag"
                                    placeholder="Teq əlavə et">
                            </div>
                        </li>
                    </div>
                    <div class="edit-btns-group">
                        <button class="cancel-btn" @click="editMode = false">Ləğv et</button>
                        <button class="save-btn" @click="saveEdit">Yadda saxla</button>
                    </div>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "AllTasks",
    data() {
        return {
            splitterKey: '-;-',
            allTaskWithTag: [],
            editMode: false,
            editedTask: {
                id: null,
                name: null,
                status: null,
                tagList: [],
                deletedTagsList: [],
                newTagsList: [],
            },
            addNewTagTrigger: false,
            newTag: '',
            defaultTaskNameAndStatus: ''
        }
    },
    computed: {
        allTags() {
            let all_tags = localStorage.getItem('all_tags')?.split(',');
            if (all_tags?.includes('all_tags')) {
                var index = all_tags.indexOf('all_tags');
                if (index !== -1) {
                    all_tags.splice(index, 1);
                }
            }
            all_tags.push('non_tag');
            return all_tags;
        },
    },
    methods: {
        getAllTasks() {
            this.allTags?.forEach(tag => {
                let target = localStorage.getItem(tag)?.split(',');
                target?.forEach(taskData => {
                    const target2 = this.allTaskWithTag.find(item => item.task === taskData);
                    if (!target2) {
                        this.allTaskWithTag.push({ task: taskData, tags: [tag] });
                    } else {
                        const targetIndex = this.allTaskWithTag.indexOf(target2);
                        this.allTaskWithTag[targetIndex].tags.push(tag);
                    }
                })
            })
        },
        checkStatus(val) {
            return Boolean(val?.split(this.splitterKey)[1]?.trim() === 'true')
        },
        deleteTask(task_name) {
            const checkDeleteRequest = window.confirm(`( ${task_name} ) adlı tapşırıqı silmək istədiyinizdən əminsinizmi?`);
            if (checkDeleteRequest == true) {
                this.deleteTaskController();
                this.editMode = false;
            }
        },
        deleteTag(tag_name) {
            this.editedTask.deletedTagsList.push(tag_name);
            const targetIndex = this.editedTask.tagList.indexOf(tag_name);
            if (targetIndex > -1) {
                this.editedTask.tagList.splice(targetIndex, 1)
            }
        },
        saveEdit() {
            let taskName = `${this.editedTask.name.trim()} -;- ${this.editedTask.status}`;
            this.defaultTaskNameAndStatus = this.allTaskWithTag[this.editedTask.id].task;
            this.allTaskWithTag[this.editedTask.id].task = taskName;
            this.allTaskWithTag[this.editedTask.id].tags = this.editedTask.tagList;
            if (!this.allTaskWithTag[this.editedTask.id].tags.length) {
                this.allTaskWithTag[this.editedTask.id].tags.push("non_tag");
                this.setLocalStorage({ name: 'non_tag' }, taskName);
            }

            this.editTaskNameAndStatusController(this.allTaskWithTag[this.editedTask.id]);
            this.deleteTagsController(taskName);
            this.addNewTagsController(taskName);
            this.editMode = null;
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
        addNewTagHandler(e) {
            if (e.key === "Enter" || e.key === ",") {
                if (!this.editedTask.tagList.includes(this.newTag.trim()) && this.newTag.trim().length > 0) {
                    this.editedTask.newTagsList.push(this.newTag);
                    this.editedTask.tagList.push(this.newTag);
                }
                this.newTag = "";
            }
        },
        deleteTagsController(taskName) {
            const deletedTagsList = this.editedTask.deletedTagsList;
            deletedTagsList.forEach(item => {
                let target = localStorage.getItem(item)?.split(',');
                let task_index = target?.indexOf(taskName);
                if (task_index > -1) {
                    target.splice(task_index, 1)
                }
                if (!target?.length) {
                    localStorage.removeItem(item);
                    let reEditedAllTags = this.allTags;
                    let targetIndex = this.allTags.indexOf(item);
                    if (targetIndex > -1) {
                        reEditedAllTags.splice(targetIndex, 1)
                        localStorage.setItem('all_tags', reEditedAllTags);
                    }
                } else {
                    localStorage.setItem(item, target.join());
                }
            })
        },
        addNewTagsController(taskName) {
            this.editedTask.newTagsList.forEach(item => {
                this.setLocalStorage({ name: item }, taskName);
            })
        },
        deleteTaskController() {
            const targetTaskName = `${this.allTaskWithTag[this.editedTask.id].task}`;
            const targetTags = this.allTaskWithTag[this.editedTask.id].tags;
            targetTags.forEach(item => {
                let target = localStorage.getItem(item)?.split(',');
                if (target?.length === 1) {
                    localStorage.removeItem(item);
                    let reEditedAllTags = this.allTags;
                    let targetIndex = this.allTags.indexOf(item);
                    if (targetIndex > -1) {
                        reEditedAllTags.splice(targetIndex, 1)
                        localStorage.setItem('all_tags', reEditedAllTags);
                    }
                } else {
                    let index = target.indexOf(targetTaskName);
                    if (index > -1) {
                        target.splice(index, 1);
                    }
                    localStorage.setItem(item, target.join());
                }
            })
            window.location.reload();
        },
        editTaskNameAndStatusController(targetObject) {
            const newTaskNameAndStatus = targetObject.task;
            if (newTaskNameAndStatus !== this.defaultTaskNameAndStatus) {
                this.allTags.forEach(item => {
                    let target = localStorage.getItem(item);
                    if (target) {
                        target = target.split(',');
                        const targetIndex = target.indexOf(this.defaultTaskNameAndStatus);
                        if (targetIndex > -1) {
                            target[targetIndex] = newTaskNameAndStatus;
                            localStorage.setItem(item, target);
                        }
                    }
                })
            }
        },

    },
    mounted() {
        this.getAllTasks()
    },
    watch: {
        editMode(val) {
            this.editedTask.deletedTagsList = [];
            this.newTag = "";
            this.addNewTagTrigger = false;

            this.editedTask.id = val;
            this.editedTask.name = this.allTaskWithTag[val]?.task?.split(this.splitterKey)[0];
            this.editedTask.status = this.checkStatus(this.allTaskWithTag[val]?.task)
            this.editedTask.tagList = this.allTaskWithTag[val]?.tags.map(item => item.trim());
            if (val === null) {
                window.location.reload();
            }
        },
        addNewTagTrigger(val) {
            if (val) {
                setTimeout(() => {
                    this.$refs.focusHere[0].focus();
                }, 100)
            }
        },
        newTag(val) {
            if (val === ',') {
                this.newTag = "";
            }
        }
    }
}
</script>

<style scoped>
#all-tasks-container .header-section {
    margin-bottom: 40px;
}

#all-tasks-container .header-section i {
    padding: 10px;
}

#all-tasks-container .tasks-list .task-item {
    margin-top: 20px;
    padding: 10px;
    background-color: var(--color-main-white);
    border-radius: 10px;
    box-shadow: 3px 3px 10px var(--color-main-grey1);
}

#all-tasks-container .tasks-list .task-item:hover {
    box-shadow: 3px 3px 30px var(--color-main-grey1);
    cursor: pointer;
}

#all-tasks-container .tasks-list .task-item .task-header div {
    width: 130%;
}

#all-tasks-container .tasks-list .task-item .task-header .task-title {
    display: flex;
    padding: 10px 10px;
}

#all-tasks-container .tasks-list .task-item .task-header .task-title h3 {
    margin-left: 7px;
}

#all-tasks-container .tasks-list .task-item .task-header .task-title-edit input {
    margin-left: 7px;
    margin-bottom: 30px;
    font-size: 17px;
    width: 450px;
    border-bottom: 2px dashed red;
}

#all-tasks-container .tasks-list .task-item .task-header .task-title-edit i {
    padding: 10px 12px;
    font-size: 20px;
    color: var(--color-main-red);
    background-color: var(--color-main-grey);
    border-radius: 50%;
}

#all-tasks-container .tasks-list .task-item .task-header .task-title-edit i:hover {
    background-color: var(--color-main-red);
    color: var(--color-main-grey);
}

#all-tasks-container .tasks-list .task-item .task-header .task-status {
    font-size: 10px;
    width: 200px;
    margin-top: 10px;
    padding: 5px;
    color: var(--color-main-white);
}

#all-tasks-container .tasks-list .task-item .task-header .task-status-edit {
    font-size: 12x;
    width: 230px;
    padding: 5px;
}

#all-tasks-container .tasks-list .task-item .task-header .task-status-edit input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin: 5px 7px 0 0;
}


#all-tasks-container .tasks-list .task-item .task-header .task-status span {
    color: var(--color-main-white);
}

#all-tasks-container .tasks-list .task-item .tags-list,
#all-tasks-container .tasks-list .task-item .tags-list-edit {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 680px;
}

#all-tasks-container .tasks-list .task-item .tags-list-edit .tag-edit-section {
    width: 400px;
    display: flex;
    flex-wrap: wrap;
}

#all-tasks-container .tasks-list .task-item .tags-list-edit .edit-btns-group button {
    padding: 8px !important;
    margin: 10px 6px;
}

#all-tasks-container .tasks-list .task-item .tags-list-edit .edit-btns-group button.save-btn {
    background-color: var(--color-main-blue);
    color: var(--color-main-white);
}

#all-tasks-container .tasks-list .task-item .tags-list .tag-item div {
    font-size: 13px;
    padding: 5px 10px;
    border-radius: 10px;
    margin: 6px 5px;
    background-color: var(--color-main-grey);
    border: 2px solid var(--color-main-white);
    font-weight: bolder;
}

#all-tasks-container .tasks-list .add-new-tag-edit input::placeholder {
    color: var(--color-main-white);
    opacity: 0.8;
}

#all-tasks-container .tasks-list .add-new-tag-edit input {
    width: 100px;
    background-color: var(--color-main-red) !important;
    color: var(--color-main-white);
    font-weight: bold;
    font-size: 13px;
    text-align: center;
}

#all-tasks-container .tasks-list .task-item .tags-list-edit .tag-item div {
    font-size: 13px;
    padding: 5px 10px;
    border-radius: 10px;
    margin: 6px 5px;
    background-color: var(--color-main-red);
    border: 2px solid var(--color-main-white);
}

#all-tasks-container .tasks-list .task-item .tags-list-edit .tag-item div>i,
#all-tasks-container .tasks-list .task-item .tags-list-edit .tag-item div {
    color: var(--color-main-white);
    font-weight: bolder;
}

#all-tasks-container .tasks-list .task-item .tags-list .tag-item div:hover {
    cursor: pointer;
    background-color: var(--color-main-white);
    border: 2px solid var(--color-main-black);
}
</style>
