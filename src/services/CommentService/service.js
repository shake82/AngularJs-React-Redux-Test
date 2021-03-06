import data from './mock-data';

const COMMENTS_URI = 'http://localhost:3004/comments';


export default class CommentService {

    static $inject = ['$http'];
    constructor($http) {
        this.$http = $http;
    }

    queryComments() {
        // return this.$http.get(COMMENTS_URI).then((resp) => {
        //     return this.setComments(resp.data);
        // });

        return Promise.resolve(data.comments);
    }

    getComments() {
        return this.comments;
    }

    setComments(comments) {
        this.comments = comments;
        return comments;
    }
}
