'use strict'

const View = use('View')
const BQ = use('App/Models/Bq')
const InputFile = use('App/Models/InputFile')
const Lain2 = use('App/Models/Lain2')
const Member = use('App/Models/Member')
const Perlengkapan = use('App/Models/Perlengkapan')
const Personil = use('App/Models/Personil')
const Tender = use('App/Models/Tender')
const Database = use('Database')
class UiController {

    async Dashboard({request, response, session}){
        const getSessionData = session.get('SessionLogin')
        return View.render('Dashboard', { session_data : getSessionData})
    }

    async Bq({request, response, session}){
        const getDataBQ = await BQ.all()
        const getSessionData = session.get('SessionLogin')
        return View.render('Bq',{ data_bq : getDataBQ.toJSON(), session_data : getSessionData})
    }

    async SuratPenerimaan({request, response, session}){
        const getDataBQ = await BQ.all()
        const getSessionData = session.get('SessionLogin')
        return View.render('SuratPenerimaan', { data_bq : getDataBQ.toJSON(), session_data : getSessionData})
    }

    async PilihSuratPenerimaan({request, response, session}){
        var id = request.params.id
        const getSessionData = session.get('SessionLogin')
        const getBQData = await BQ.find(id)
        const getTender = await Tender.query()
                            .where('id_bq', id)
                            .select('*')
                            .select(Database.raw('SUM(`nominal`) AS total_nominal'))
                            .groupBy('bulan')
                            .fetch()
        console.log(getTender.toJSON())
        return View.render('PilihSuratPenerimaan', { data_bq : getBQData.toJSON() , id : id , data_tender : getTender.toJSON() , session_data : getSessionData })
    }

    async TambahSuratPenerimaan({request, response, session})
    {  
        const getSessionData = session.get('SessionLogin')
        var id = request.params.id
        const getBQ = await BQ.find(id)
        const getPersonil = await Personil.query().where('id_bq',id).fetch()
        const getPerlengkapan = await Perlengkapan.query().where('id_bq',id).fetch()
        const getLain2 = await Lain2.query().where('id_bq',id).fetch()
        const BQS = getBQ.toJSON()
        const Personils = getPersonil.toJSON()
        const Perlengkapans = getPerlengkapan.toJSON()
        const Lain2s = getLain2.toJSON()
        
  
        return View.render('TambahSuratPenerimaan',{BQS, Personils, Perlengkapans, Lain2s, session_data : getSessionData})
        
    }

    async Login({ request, response , session}){
        
        return View.render('Login')
    }

    async TambahBQ({request, response, session}){
        const getSessionData = session.get('SessionLogin')
        return View.render('TambahBQ', {session_data : getSessionData})
    }

    async Invoice({request, response, session}){
        const getSessionData = session.get('SessionLogin')
        return View.render('Invoice', { session_data : getSessionData })
    }

    async EditBQ({request, response, session}){
        const getSessionData = session.get('SessionLogin')
        var id = request.params.id
        const getBQ = await BQ.find(id)
        const getPersonil = await Personil.query().where('id_bq',id).fetch()
        const getPerlengkapan = await Perlengkapan.query().where('id_bq',id).fetch()
        const getLain2 = await Lain2.query().where('id_bq',id).fetch()
        const BQS = getBQ.toJSON()
        const Personils = getPersonil.toJSON()
        const Perlengkapans = getPerlengkapan.toJSON()
        const Lain2s = getLain2.toJSON()
        
  
        return View.render('EditBq',{BQS, Personils, Perlengkapans, Lain2s, session_data : getSessionData})
    }
}

module.exports = UiController
