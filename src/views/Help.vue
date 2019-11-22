<template>
  <div id="help" class="help-page">
    <main class="help-inner">
      <section class="sub-title-area container-fluid">
        <h2 class="title">HELP</h2>
        <ul>
          <li>
            <h4 class="sub-title">コスメの追加の仕方</h4>
            <div>
              右上の
              <img src="/images/helpImages/headerIcon.png" width="25" height="25" />から追加したいコスメの分野を選択します。
            </div>
            <div>コスメを追加ボタンでコスメを追加します。</div>
            <span>---コスメを追加ボタンを画像で---</span>
            <div>コスメの情報を入力して、コスメを登録ボタンでコスメを登録してください。</div>
            <span>---コスメを登録ボタンを画像で---</span>
            <div>※名前情報が入力されていないと追加できません。</div>
          </li>
          <li>
            <h4 class="sub-title">コスメの情報の変更の仕方</h4>
            <div>
              右上の
              <img src="/images/helpImages/headerIcon.png" width="25" height="25" />から変更したいコスメの分野を選択し、変更したいコスメをタップしてください。
            </div>
            <span>---変更モジュール---</span>
            <div>コスメ情報を変更し、コスメを更新ボタンでコスメ情報を更新してください。</div>
            <span>---コスメを更新ボタンを画像で---</span>
          </li>
          <li>
            <h4 class="sub-title">コスメの削除の仕方</h4>
            <div>
              右上の
              <img src="/images/helpImages/headerIcon.png" width="25" height="25" />から削除したいコスメの分野を選択し、削除したいコスメをタップしてください。
            </div>
          </li>
          <li>
            <h4 class="sub-title">使い方</h4>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'help-page'
}
</script>

<style scoped>
@keyframes floatArrow {
  50% {
    transform: rotate(45deg) translate(5px, 5px);
  }
}

#help .help-page {
  padding: 8px;
}

#help .help-inner section {
  padding-top: 40px;
  padding-bottom: 40px;
}

#help .help-inner .sub-title-area {
  background-color: #f8f3ed;
}
</style>
