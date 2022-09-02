var users = 
`spreatics//12341234//코딩온
codee//4321//codee
kyeongmin//1234//윤경민`;

const ids = users.split("\n");
console.log(ids);

exports.users = function(){
    return{
        users
    }
}


