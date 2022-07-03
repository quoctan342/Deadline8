Vue.component('modal', {
  template: `
  <div class="modal">
    <div class="modal__header">
      <slot name="modal-header"></slot>
    </div>
    <div class="modal__body">
      <slot name="modal-body"></slot>
    </div>
    <div class="modal__footer">
      <slot name="modal-footer"></slot>
    </div>
  </div>
  `
  }
)
