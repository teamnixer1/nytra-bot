const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('social')
    .setDescription('Social platform stats')
    .addSubcommand(subcommand =>
      subcommand
        .setName('stats')
        .setDescription('Show follower counts from YouTube, Instagram, TikTok, and Discord')
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() !== 'stats') return;

    await interaction.deferReply();

    const safeCount = (value) => {
      return (typeof value === 'number' && !isNaN(value)) ? value : 'N/A';
    };

    try {
      // Placeholder values — replace with real fetch logic later
      const stats = {
        youtube: { followers: null },
        instagram: { followers: null },
        tiktok: { followers: NaN },
        discord: { followers: interaction.guild?.memberCount }
      };

      const embed = new EmbedBuilder()
        .setTitle('📊 Nytra Follower Stats')
        .setDescription('Synced follower counts across all Mythlight platforms.')
        .addFields(
          { name: 'YouTube', value: `Followers: ${safeCount(stats.youtube.followers)}`, inline: true },
          { name: 'Instagram', value: `Followers: ${safeCount(stats.instagram.followers)}`, inline: true },
          { name: 'TikTok', value: `Followers: ${safeCount(stats.tiktok.followers)}`, inline: true },
          { name: 'Discord', value: `Members: ${safeCount(stats.discord.followers)}`, inline: true }
        )
        .setColor(0x676767)
        .setFooter({ text: 'Nytra Bot • Synced from backend clarity' })
        .setTimestamp();


      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error('Error in /social stats:', err);
      await interaction.editReply({ content: 'Failed to fetch follower stats.' });
    }
  },
};
