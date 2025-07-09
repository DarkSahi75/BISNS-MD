const { cmd, commands } = require("../lib/command");
const axios = require("axios");
const path = require("path");

const commandInfo = {
  pattern: "mp4video",
  category: "download",
  filename: __filename,
  desc: "Download any video as an MP4 file."
};

cmd(commandInfo, async (client, message, args, { from, q: query, reply }) => {
  try {
    if (!query) {
      return reply("❌ Please provide a video URL.");
    }

    const response = await axios.head(query);
    let filename = "video.mp4";

    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition && contentDisposition.includes("filename=")) {
      const match = contentDisposition.match(/filename="?(.+?)"?$/);
      if (match && match[1]) {
        filename = match[1];
      }
    } else {
      filename = path.basename(query.split('?')[0]);
    }

    const document = {
      url: query
    };

    const messageOptions = {
      document: document,
      mimetype: "video/mp4",
      fileName: filename
    };

    const sendOptions = {
      quoted: message
    };

    await client.sendMessage(from, messageOptions, sendOptions);
  } catch (error) {
    return reply("Error: " + error.message);
  }
});
