<template>
  <div id="help" class="help-page">
    <main class="help-inner">
      <section class="sub-title-area container-fluid">
        <h2 class="title">HELP</h2>
        <h3>trousseとは</h3>
        <div>登録したコスメから各分野ごとに一つずつ選びます。使うコスメを選べなくて困ったときに使ってください。</div>
        <h3 class="title">EDIT</h3>

        <details>
          <summary class="sub-title">コスメの追加の仕方</summary>
          <div>
            右上のハンバーガーメニュー
            <img src="/images/helpImages/headerIcon.png" width="25" height="25" />から追加したいコスメの分野を選択します。
          </div>
          <div>
            コスメを追加ボタン
            <img src="/images/helpImages/openRegisterCosme.png" width="200" height="40" />でコスメを追加します。
          </div>
          <div>
            コスメの情報を入力して、コスメを登録ボタン
            <img
              src="/images/helpImages/registerCosmeButton.png"
              width="200"
              height="40"
            />でコスメを登録してください。
          </div>
          <div>※名前情報が入力されていないと追加できません。</div>
        </details>
        <details>
          <summary class="sub-title">コスメの情報の変更の仕方</summary>
          <div>
            右上のハンバーガーメニュー
            <img src="/images/helpImages/headerIcon.png" width="25" height="25" />から変更したいコスメの分野を選択し、変更したいコスメを選択してください。
          </div>
          <div>
            コスメ情報を変更し、右下のコスメを更新ボタン
            <img
              src="/images/helpImages/changeCosmeButton.png"
              width="120"
              height="40"
            />でコスメ情報を更新してください。
          </div>
          <div>※コスメ情報が変更されていないと更新できません。</div>
        </details>
        <details>
          <summary class="sub-title">コスメの削除の仕方</summary>
          <div>
            右上のハンバーガーメニュー
            <img src="/images/helpImages/headerIcon.png" width="25" height="25" />から削除したいコスメの分野を選択し、削除したいコスメを選択してください。
          </div>
          <div>
            右下のコスメを削除ボタン
            <img src="/images/helpImages/deleteCosmeButton.png" width="120" height="40" />でコスメ情報を削除してください。
          </div>
        </details>
        <h3 class="title">MAIN</h3>

        <details>
          <summary class="sub-title">SELECT</summary>
          <div>
            使いたいコスメの分野を選んで、分野の名前を選択してください。左の丸が
            <img
              src="/images/helpImages/selected.png"
              width="240"
              height="40"
            />となっていれば選択済みで、
            <img src="/images/helpImages/unselected.png" width="240" height="40" />となっていれば、選択されていません。
          </div>
          <div>
            また、コスメのアイコンを選択するとそのコスメを候補に入れたり外したりできます。
            候補に入っていれば、
            <img
              src="/images/helpImages/mainSelected.png"
              width="80"
              height="60"
            />、
            入っていなければ、
            <img
              src="/images/helpImages/mainUnselected.png"
              width="80"
              height="60"
            />となります。
          </div>
        </details>

        <details>
          <summary class="sub-title">FILTER</summary>コスメを登録する時の『テーマ』でコスメを絞ることができます。
          絞りたいコスメのテーマを選択してください。複数選択可
        </details>
        <details>
          <summary class="sub-title">RESULT</summary>コスメを一つずつ選んで表示してくれます。
        </details>

        <h3 class="title">LOGOUT</h3>

        <details>
          <summary class="sub-title">ログアウトの仕方</summary>
          <div>
            右上のハンバーガーメニュー
            <img src="/images/helpImages/headerIcon.png" width="25" height="25" />のログアウト
            <img src="/images/helpImages/logout.png" width="120" height="30" />
            を選択してください。
          </div>
        </details>
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

#help .help-inner .sub-title-area {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f8f3ed;
  min-height: calc(100vh - 68px);
  box-sizing: border-box;
}

#help .help-text {
  font-weight: 100;
}
</style>
