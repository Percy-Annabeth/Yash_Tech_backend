class ApiFeatures {
    constructor(query,queryStr){

        //query is anything that is after ? in the url. like keyword, and value.

        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword=this.query.keyword?{
            name:{
                $regex: this.queryStr.keyword,
                $options:"i",
            },
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};

        //now we will remove some fields from querycopy, so as to not interfere with search, pagination, etc.
        //make an array, and for each loop, all fields in array, will be removed from querycopy.
        const removeFields =["keyword","page","limit"];
        removeFields.forEach(key=>{delete queryCopy[key]});

        //now filter for price and rating, so we need to have range, thus gt and lt (GRATERTHAN, LESSTHAN)
        //gt and lt is in querycopy. we just need to add $ in front of it, to make it mongodb operator. so we convert to string

        let queryStr = JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);/*this /\b()\b/g is to apply to all.*/


        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;


    }
    
    pagination(resultsPerPage){

        const currentPage= Number(this.queryStr.page)||1;
        const skip = resultsPerPage*(currentPage-1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        
        return this;
    }

};

module.exports = ApiFeatures;
