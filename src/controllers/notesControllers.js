const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const user_id = request.user.id;

        const checkTitleExists = await knex("notes")
        .where({ title });
        if(checkTitleExists[0]) {
            throw new AppError("This movie has already been added.");
        }

        if(rating < 1 || rating > 5) {
            throw new AppError("Enter a value from 1 to 5.")
        };

        const note_id = await knex("notes").insert({
            title,
            description,
            rating,
            user_id
        });

        if (tags.length === 0) {
            return response.status(201).json();
        }

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.status(201).json();
    }

    async show(request, response) {
        const { id } = request.params;

        const note = await knex("notes").where({id}).first();
        const tags = await knex("tags").where({note_id: id}).orderBy("name");

        return response.json({
            ...note,
            tags
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { title } = request.query;
        const user_id = request.user.id;
        
        let notes;

        notes = await knex("notes").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title");
        
        const userTags = await knex("tags").where({ user_id });
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)
            return {
                ...note,
                tags: noteTags
            }
        })

        return response.json(notesWithTags)
    }
}

module.exports = NotesController