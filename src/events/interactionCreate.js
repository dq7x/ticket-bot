import chalk from 'chalk';

export default {
  name: 'interactionCreate',
  async execute(interaction, client) {
    try {
      // Slash Commands
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        
        if (!command) {
          return interaction.reply({ 
            content: '❌ Command not found!', 
            ephemeral: true 
          });
        }
        
        await command.execute(interaction, client);
        console.log(chalk.gray(`/${interaction.commandName} by ${interaction.user.tag}`));
      }
      
      // String Select Menus (Dropdowns)
      else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'ticket_category_select') {
          const { handleCategorySelect } = await import('../systems/ticket/ticketManager.js');
          await handleCategorySelect(interaction);
        }
      }
      
      // Buttons
      else if (interaction.isButton()) {
        const customId = interaction.customId;
        
        if (customId === 'ticket_close') {
          const { handleCloseButton } = await import('../systems/ticket/ticketButtons.js');
          await handleCloseButton(interaction);
        }
        else if (customId === 'ticket_claim') {
          const { handleClaimButton } = await import('../systems/ticket/ticketButtons.js');
          await handleClaimButton(interaction);
        }
        else if (customId === 'ticket_transcript') {
          const { handleTranscriptButton } = await import('../systems/ticket/ticketButtons.js');
          await handleTranscriptButton(interaction);
        }
        else if (customId === 'ticket_delete') {
          const { handleDeleteButton } = await import('../systems/ticket/ticketButtons.js');
          await handleDeleteButton(interaction);
        }
      }
      
      // Modals
      else if (interaction.isModalSubmit()) {
        if (interaction.customId.startsWith('ticket_modal_')) {
          const { handleTicketModal } = await import('../systems/ticket/ticketManager.js');
          await handleTicketModal(interaction);
        }
      }
      
    } catch (error) {
      console.error(chalk.red('Interaction Error:'), error);
      
      const errorMessage = { 
        content: '❌ An error occurred!', 
        ephemeral: true 
      };
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage).catch(() => {});
      } else {
        await interaction.reply(errorMessage).catch(() => {});
      }
    }
  }
};
