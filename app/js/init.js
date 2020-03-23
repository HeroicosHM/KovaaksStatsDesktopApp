const { dialog } = require('electron').remote
const settings = require('electron-settings')

var title = document.getElementById('title').innerHTML

document.getElementById('titleShown').innerHTML = title

document.getElementById('statsFolder').addEventListener('click', function (event) {
  dialog.showOpenDialog({
      properties: ['openDirectory', 'showHiddenFiles'],
      title: "Select Your Kovaak's Aim Trainer Stats File"
  }).then(result => {
    console.log(result.canceled)
    console.log(result.filePaths[0])
    if (!result.canceled) {
      settings.set('stats', {
        folder: result.filePaths[0]
      })
    }
  }).catch(err => {
    console.log(err)
  })
})
