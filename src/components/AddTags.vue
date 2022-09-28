<template>
    <div class="add-tag">
        <button v-if="!tagTrigger" @click="tagTrigger = true">
            <i class="fi fi-sr-tags icon-custom-style"></i> Add tag
        </button>
        <div v-else>
            <input v-model="tags" class="tags-input" placeholder="Vergül ilə ayırın">
            <button class="add-tags-done-btn" @click="tagAddingDone">
                <i class="fi fi-br-check icon-custom-style"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddTags",
    data() {
        return {
            tagTrigger: false,
            tagList: [],
            tagDebounce: null,
            tags: '',
        }
    },
    methods: {
        sortTags() {
            let result = this.tags.split(',');
            result = result.map(this.spaceAfterComma);
            result = result.filter(item => item !== undefined);
            this.tagList = [...new Set(result)];
            clearTimeout(this.tagDebounce);
            this.tagDebounce = setTimeout(() => {
                this.tags = this.tagList.join()
                if (this.tagList.length > 0) {
                    this.tags = this.tags + ", ";
                }
            }, 1000);

        },
        spaceAfterComma(tag) {
            tag = tag.trim();
            if (tag.split('')[0] !== " ") {
                tag = " " + tag;
            }
            if (tag.length > 1) {
                return tag
            }
        },
        tagAddingDone() {
            this.tagTrigger = false;
            this.tags = this.tagList.join();
        },
    },
    watch: {
        tags(val) {
            if (!val.length) {
                this.tagList = [];
            }
            this.sortTags();
        },
        tagList(val) {
            this.$emit('tagList', val);
        }
    }
}
</script>

<style scoped>
.add-tag .tags-input {
    font-size: 15px;
    padding: 10px;
    border-radius: 5px;
}

.add-tag .add-tags-done-btn {
    border-radius: 10px;
    margin-left: 10px;
}
</style>