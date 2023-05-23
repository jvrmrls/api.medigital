import {validationResult} from 'express-validator'
// Import model
import ToolModel from '../models/ToolModel.js'

export async function getAll(req, res) {
    try {
        /* A query to the database. */
        const _data = await ToolModel
            .find({is_active: true})
            .sort({
                parent: -1,
                order: 1
            })
            .select('-is_active')
            .populate({path: 'parent', select: '_id', options: {sort: {order: 1}}})

        //* Get only the child tools
        const _childTools = _data.filter(tool => tool.parent)

        //* Search the parent tool and add the child tools
        const tools = _data.filter(tool => {
            //* Verify if this tool is a children end don't add it to the tools array
            if (_childTools?.some(child => child._id.toString() === tool._id.toString())) return
            //* Search the children of this tool
            const children = _childTools.filter(child => child.parent._id.toString() === tool._id.toString())
            //* If the tool has children add them to the tool object and delete the url property
            if (children.length > 0) {
                tool._doc.items = children
                delete tool._doc.url
                return tool
            }
            //* If the tool doesn't have children return tool
            return tool
        })

        /* Returning the response to the client. */
        return res.status(200).json(tools)
    } catch (err) {
        console.log(err)
        /* Returning the response to the client. */
        return res.status(500).json(err)
    }
}

export async function getSpecific(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        const {_id} = req.params
        /* A query to the database. */
        const _data = await ToolModel.findOne({_id})
        if (!_data)
            return res.status(400).json({msg: 'No se encontró la herramienta'})
        /* Returning the response to the client. */
        return res.status(200).json(_data)
    } catch (err) {
        /* Returning the response to the client. */
        return res.status(500).json(err)
    }
}
