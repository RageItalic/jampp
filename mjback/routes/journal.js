const express       = require('express')
const router        = express.Router()
const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex          = require('knex')(configuration)
const cryptico      = require('cryptico')
const verifyToken   = require('./authentication/verifyToken.js')
const encryptVars   = require('../encryptVars.js')
const aiApi         = require('../aiApi.js')

router.get('/latestJournalAnalysis', async (req, res) => {
	try {
		const latestEntry = await knex('journal_entries')
			.select('*')
			.where({
				entry_maker_id: req.userId
			})
			.orderBy('desc')
			.limit(1)
		
		console.log("Latest Journal Entry... that should be encrypted", latestEntry)
		
		const cipherText = latestEntry[0].encrypted_content
		const DecryptionResult = cryptico.decrypt(CipherText, encryptVars.MjRSAkey)
		const journal_entry = DecryptionResult.plaintext

		const [insightJson, toneJson, languageJson] = await Promise.all([
			aiApi.getPersonalityInsights(journal_entry),
			aiApi.analyzeTone(journal_entry),
			aiApi.understandNaturalLanguage(journal_entry)
		])

		const personalityData = insightJson.personality
    const toneData = toneJson.document_tone.tone_categories
    const needsData = insightJson.needs
    const valuesData = insightJson.values
    const keywordsData = languageJson.keywords

    console.log("HEILLO", toneData)

    //TODO: Format and send chart data, 
    //but before that happens, 
    //need to test out a few static charts on the frontend.

	} catch (e) {
		console.log("NONE EXIST?", e)
     const message = {
      status: 404,
      content: 'This user has not made a journal entry as of yet.'
    }
    res.status(404).send({
    	message: "There are no journal entries as of yet."
    })
	}
})

router.post('/journalEntry', async (req, res) => {
	const {title, journalEntry} = req.body
	try {
    const EncryptionResult = cryptico.encrypt(journalEntry, encryptVars.MjPublicKeyString);

    console.log("LOOK HERE", EncryptionResult.cipher)

    const insertJournal = await knex('journal_entries')
    	.insert([{
    		title,
    		encrypted_content: EncryptionResult.cipher,
      	entry_maker_id: req.userId
    	}])
    console.log("insert journal response", insertJournal)

    const [insightJson, toneJson, languageJson] = await Promise.all([
			aiApi.getPersonalityInsights(journal_entry),
			aiApi.analyzeTone(journal_entry),
			aiApi.understandNaturalLanguage(journal_entry)
		])

		const personalityData = insightJson.personality
    const toneData = toneJson.document_tone.tone_categories
    const needsData = insightJson.needs
    const valuesData = insightJson.values
    const keywordsData = languageJson.keywords

    console.log("HEILLO", toneData)

    //TODO: Format and send chart data, 
    //but before that happens, 
    //need to test out a few static charts on the frontend.

	} catch (e) {
		console.log("Could not insert?", e)
		res.status(408).send({
			message: "Something went wrong. Please try resubmit this journal entry."
		})
	}
})

module.exports = router