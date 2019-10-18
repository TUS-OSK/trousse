<template>
  <div id="edit" class="edit-page container-fluid">
    <main class="ed-main">
      <h2 class="ed-sub-title">{{ type }}の編集画面</h2>
      <div class="ed-main-function">
        <div class="ed-main-list">
          <div v-if="cosmeNumber">
            <cosme-list :cosmeType="this.type" :cosmeAry="cosmeAry" listType="edit"></cosme-list>
          </div>
          <div v-else>
            <h3>コスメを登録しましょう！</h3>
          </div>
        </div>
        <button class="ed-modal-btn" @click="showAddCosmeModal()" >コスメを追加</button>
        <cosme-form-modal formId="new" formType="register" :focusingType="type"/>
      </div>
    </main>
    <transition name="fade">
      <load-page v-if="!isLoaded" pageName="Edit"></load-page>
    </transition>
  </div>
</template>

<script>
import CosmeList from '@/components/modules/CosmeList.vue'
import CosmeFormModal from '@/components/modules/CosmeFormModal.vue'
import LoadPage from '@/components/LoadPage.vue'

export default {
  name: 'edit',
  components: {
    CosmeList,
    CosmeFormModal,
    LoadPage
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      addCosmeValue: 'コスメを追加',
      isDragging: false,
      isLoaded: true,
      cosmesData: {
        type: this.type,
        cosmeAry: this.$store.getters['userData/cosmes'][this.type]
      }
    }
  },
  methods: {
    showAddCosmeModal() {
      this.$modal.show('form-modal-new')
    }
  },
  computed: {
    cosmeAry() {
      return this.$store.getters['userData/cosmes'][this.type]
    },
    cosmeIdcount(){
      return this.$store.getters['userData/cosmeIdCount']
    },
    fakeCosmes() {
      return [...new Array(10).keys()].map(num => `fakeCosme${num}`)
    },
    cosmeNumber() {
      return this.$store.getters['userData/cosmes'][this.type].length
    }
  },
  created() {
    this.isLoaded = false
    setTimeout(() => {
      this.isLoaded = true
    }, 1000)
    console.log(this.cosmesData)
  }
}

</script>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(30deg)
  }
  50% {
    transform: rotate(210deg)
  }
  100% {
    transform: rotate(390deg)
  }
}

/* .ed-modal-btn {
  color: white;
  cursor:pointer;
  width: 100%;
  margin: 12px 0;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  white-space: normal;
  background-color: #B25A74;
  font-size: 20px;
}
.fake-icon {
  width: 118px;
}
.ed-main {
  height: 100%;
}
.ed-main-list {
  padding: 8px;
  background-color: rgb(243, 234, 183);
}
.ed-main-li-draggable {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.ed-main-function {
  padding: 8px;
}

.fade-leave-active, .fade-enter-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
} */
</style>
