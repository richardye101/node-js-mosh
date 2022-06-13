// Trade off: Query performance and consistency

// When changing an author name, in ref only need to change it in one place and it updates everywhere

// References (Normalization) -> Consistency
let author_1 = {
    name: 'Mosh'
}

let course_1 = {
    author: 'id',
    // authors: [ // could have some random stuff, the above and this are not related
    //     'id1',
    //     'id2'
    // ]
}

// Embedded Documents (Denormalization) -> Performance
// If change name of author, then need to access every course. Also if it fails, some courses may be wrong

let course_2 = {
    author: {
        name: 'Mosh'
    }
}

// Hybrid Approach
// Author has 50 properties

let author_3 = {
    name: 'Mosh',
    // 50 other properties
}

let course_3 = { // allows us to have a snapshot of the course author without all their info 
    author: {
        id: 'ref to author doc',
        name: 'Mosh'
    }
}