app.component('settings-modal', {
  template: `
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay, show/hide based on modal state. -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <!-- Modal panel, show/hide based on modal state. -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-fit sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:text-center" id="modal-title">
                Settings
              </h3>
            </div>
            <div class="mt-3 text-left sm:mt-0 sm:text-left">
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  <!-- toggle switch -->
                  <div class="flex items-center justify-center w-full px-3 pt-2">
                    <label for="toggleB" class="flex items-center cursor-pointer">
                      <!-- toggle -->
                      <div class="relative">
                        <!-- input -->
                        <input type="checkbox" id="toggleB" class="sr-only" @click="darkMode()">
                        <!-- line -->
                        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <!-- dot -->
                        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                      </div>
                      <!-- label -->
                      <div class="ml-3 text-gray-700 font-medium">
                        Dark mode
                      </div>
                    </label>
                  </div>
                  <!-- end toggle -->
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 pb-3 sm:px-6">
            <button 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-full sm:text-sm"
              @click="settingsModal">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>`,
});
