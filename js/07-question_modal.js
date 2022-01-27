app.component('question-modal', {
  template: `
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="question-modal">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay, show/hide based on modal state. -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <!-- Modal panel, show/hide based on modal state. -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-fit sm:w-1/4 sm:p-4 sm:pt-2">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="w-full mt-3 text-center sm:mt-0 sm:mb-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:text-center" id="modal-title">
                How to play
              </h3>
            </div>
            <div class="mt-3 text-left sm:mt-0 sm:text-left">
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  You have 6 guesses to identify the word.  After each submission, the grid will tell you:
                </p>
                <ul class="text-sm text-gray-500 my-3 w-5/6 mx-auto">
                  <li>Gray - letter not in answer</li>
                  <li class="text-yellow-500">Yellow - letter correct, wrong location</li>
                  <li class="text-green-500">Green - letter correct, right location</li>
                </ul>

                <p class="text-sm text-gray-500">
                  Based on: <a href="https://www.powerlanguage.co.uk/wordle/" class="text-blue-600 hover:text-blue-800 visited:text-blue-600">Wordle (original)</a><br>
                  Source code on <a href="https://github.com/akliang/wordle_foo" class="text-blue-600 hover:text-blue-800 visited:text-blue-600">Github</a>
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 pb-3 sm:pt-2 sm:px-6">
            <button 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-full sm:text-sm"
              @click="questionModal">
                Close
            </button>
          </div>
        </div>
      </div>
    </div>`,
});
