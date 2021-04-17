const { User } = require('../model/User')


module.exports = {
    async get(userId) {
        const filter = {_id: userId}

        const { jobs } = await User.findOne(filter, 'jobs')

        return jobs
    },

    async create(newData, userId) {
        for (item of Object.values(newData)) {
            if (!item) return 'Missing field'
        }

        if (isNaN(newData.dailyHoursOfWork) || isNaN(newData.totalHoursOfWork)) return 'Invalid value'

        const filter = {_id: userId}

        const user = await User.findOne(filter)
        user.jobs.push(newData)
        await user.save()
    },

    async update(updatedData, userId, jobId) {
        for (item of Object.values(updatedData)) {
            if (!item) return 'Missing field'
        }

        if (isNaN(updatedData.dailyHoursOfWork) || isNaN(updatedData.totalHoursOfWork)) return 'Invalid value'

        const filter = {_id: userId}

        const user = await User.findOne(filter)
        user.jobs.map(job => {
            if(job._id == jobId) {
                for (property in updatedData) {
                    job[property] = updatedData[property]
                }
            }
        })
        await user.save()
    },

    async delete(userId, jobId) {
        const filter = {_id: userId}

        const user = await User.findOne(filter)
        await user.jobs.pull(jobId)
        await user.save()
    }
}