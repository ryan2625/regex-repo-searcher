from pyscript import document, window
from pyodide.ffi.wrappers import add_event_listener

window.console.log("Running")
window.alert("RUNNING")
'''
async def handleUpload(event):
  print("Upload complete!!!") 
  document.getElementById("tesat").innerHTML = "ASD"

def handle_click(event):
    """
    Simply log the click event to the browser's console.
    """
    window.console.log(event)    
    
add_event_listener(document.getElementById("upload"), "change", handleUpload)

'''