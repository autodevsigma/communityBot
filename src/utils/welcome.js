const { AttachmentBuilder } = require("discord.js");
const {
  Canvas,
  loadImage,
  loadFont,
} = require("canvas-constructor/napi-rs");
loadFont("./fonts/toxigenesis.otf", "toxigenesis");
loadFont("./fonts/Montserrat.ttf", "Ope");

module.exports = {
    welcome: async function(guild, member, sChannel) {
        const image = 'https://images2.imgbox.com/10/40/kOpnBiMR_o.jpg';
        let avatar = member.avatarURL({ dynamic: true, size: 2048 });
        if (!avatar) avatar = 'https://images2.imgbox.com/6f/63/SbMwJWlT_o.jpg';
        let namees = member.username;

        const imge = await loadImage(image);
        const imgge = await loadImage(avatar);

        let welcomeText = `Welcome`;

        let canvasWidth = 1707; // Platos toy background 
        let canvasHeight = 282; // Ypsos toy banner/background
        let avatarX = canvasWidth / 2; // platos toy avatar ( profile picture )
        let avatarY = canvasHeight / 2; // ypsos toy avatar 
        let avatarRadius = 130; // kykliko sxima 
        let padding = 20; // keno poy xrhsimopoieite anamesa sto welcome - avatar - username

        let imagee = new Canvas(canvasWidth, canvasHeight)
            .printImage(imge, 0, 0, canvasWidth, canvasHeight)
            .setColor("#60eafc")
            .setShadowColor("#0d3333")
            .setShadowBlur(3)
            .setShadowOffsetX(1)
            .setShadowOffsetY(1)
            .printCircle(avatarX, avatarY, avatarRadius)
            .printCircularImage(imgge, avatarX, avatarY, avatarRadius)
            .setTextFont("80px toxigenesis")
            .setTextAlign("left")
            .printWrappedText(welcomeText, avatarX - avatarRadius - padding - 405, avatarY + 10) 
            .setTextFont("70px toxigenesis")
            .printWrappedText(`@${namees}`, avatarX + avatarRadius + padding, avatarY + 10) 
            .setTextFont("30px toxigenesis")
            .setTextAlign("right")
            .printWrappedText(`Members: ${guild.memberCount}`, 1690, 260)
            .png();

        const file = new AttachmentBuilder(imagee, { name: "welcome.png"});
        sChannel.send({
            files: [file]
        });
        return true;
    }
};
