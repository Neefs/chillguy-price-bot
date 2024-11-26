import { ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Command from "../base/classes/Command";
import CustomClient from "../base/classes/CustomClient";
import Category from "../base/enums/Category";

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "test",
            description: "Test command",
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 30,
            options: [
                {
                    name: "one",
                    description: "Option one",
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: "two",
                    description: "Option two",
                    type: ApplicationCommandOptionType.Subcommand
                }
            ],
            dev: false
        })
    }

    // Execute(interaction: ChatInputCommandInteraction) {
    //     interaction.reply({content: "Test command executed!", ephemeral: true})
    // }
}