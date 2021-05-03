
function Jobs(myWorker) {

    this.jobs = [];
    this.executeJobs = async () => {
        const [currentJob] = this.jobs;
        const result = await myWorker(currentJob);

        if (result) {//Caso seja executado com sucesso então remove o job executado
            console.log('job#'.concat(currentJob.id), 'executado com sucesso.');
            this.jobs.shift();
        }
        if (this.jobs.length > 0) {
            this.executeJobs();
        }
    }
    this.addJob = (job) => {
        this.jobs.push(job);
        if (this.jobs.length === 1) {
            this.executeJobs();
        }
    }
    this.removeJob = (id) => {
        let newArJobs = this.jobs.filter((job) => {
            return job.id != id;
        });
        this.jobs = newArJobs;
    };
    this.removeAllJobs = () => {
        this.jobs = [];
    };
    this.getJobs = () => {
        return this.jobs;
    };
}

let jobs = new Jobs(function myWorker(_job) {
    return new Promise(resolve => {
        // simulando algum processo demorado
        setTimeout(() => {
            console.log(new Date(), _job);
            resolve(true);
        }, 1000)
    })
}
);

jobs.addJob({
    id: 1,
    payload: {
        filename: 'file1.txt',
        body: 'exemplo de conteudo 1'
    }
});
jobs.addJob({
    id: 2, payload: {
        filename: 'file2.txt',
        body: 'exemplo de conteudo 2'
    }
});
