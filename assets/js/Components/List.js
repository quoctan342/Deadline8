Vue.component('list', {
  template: 
  `
    <div class="list">
      <div class="list__header">
        <slot name="list-header"></slot>
      </div>
      <div class="list__body">
        <slot name="list-body"></slot>
      </div>
      <div class="list__footer">
        <slot name="list-footer"></slot>
      </div>
    </div>
  `
  })