import RiveScript from 'rivescript'

const bot = new RiveScript({debug:true});
// 
// let onError = () => {
//   alert("Error");
// }
// 
// // Load the replies
// bot.stream(replies, onError);
// bot.sortReplies();
// // Load an individual file.
// 

// All file loading operations are asynchronous, so you need handlers
// to catch when they've finished. If you use loadDirectory (or loadFile
// with multiple file names), the success function is called only when ALL
// the files have finished loading.
// function loading_done() {
//   console.log("Bot has finished loading!");
// 
//   // Now the replies must be sorted!
//   bot.sortReplies();
// 
//   // And now we're free to get a reply from the brain!
//   // NOTE: the API has changed in v2.0.0 and returns a Promise now.
//   bot.reply("local-user", "hello bot!").then(function(reply) {
//     console.log("The bot says: " + reply);
//   });
// }
// 
// // It's good to catch errors too!
// function loading_error(error, filename, lineno) {
//   console.log("Error when loading files: " + error);
// }

// handleClick = () => {
//   let message = prompt("What do you want to say to the bot? ", "hello bot!");
// 
//   bot.reply("local-user", message).then(function(reply) {
//     console.log("The bot says: " + reply);
//     alert(reply);
//   });
// 
// }


export { bot }