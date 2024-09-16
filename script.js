const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {

    // Making sure assignment has correct course id
    // Using try/catch as instructed
    try{
        if(course.id != ag.course_id){
            throw new Error ('assignment does not match course, please provide valid input')
        }
    } catch(err){
        console.log(err)
        return
    }

    let students = []
    let returnArray = []
    
    for(let submission of submissions){
        let assignment = ag.assignments.find(assignment => assignment.id === submission.assignment_id);
        // Checking for invalid input
        try{
            if(assignment.point_possible === 0){
                throw new Error('Assignment cannot have a max grade of 0; cannot calculate percentage dividing by zero')
            }
            if(typeof assignment.points_possible === 'string'){
                throw new Error(`${assignment.point_possible} is a string. Please provide an integer or float`)
            }
            if(typeof submission.submission.score === 'string'){
                throw new Error(`${submission.submission.score} is a string. Please provide an integer or float`)
            }
        } catch(err){
            console.log(err)
            return
        }
        // Due date check
        let penalty = 0;
        let dueDate = new Date(assignment.due_at);
        let today = new Date();
        let submitDate = new Date(submission.submission.submitted_at);
        if(dueDate > today){
            continue;
        };
        // Deduct 10% off total grade if late
        if(dueDate < submitDate){
            penalty += assignment.points_possible * .1;
        };
        let foundDup = false;
       for(let student of students){
        if(submission.learner_id === student.id){
            student.submissions.push({
                assignment_id: submission.assignment_id,
                score: submission.submission.score - penalty,
                maxScore: assignment.points_possible
            });
            foundDup = true;
        };
       };
       // Create new student if not found
    if(foundDup === false){
        students.push({
            id: submission.learner_id,
            submissions: [{
                assignment_id: submission.assignment_id,
                score: submission.submission.score - penalty,
                maxScore: assignment.points_possible
            }]

        });
    };
    };
    // Creating a nice clean object array with desired results
    students.forEach(function(student){
        let returnObj = {
            id: student.id,
            avg: null
        }
        // Calculating percentages and averages
        let scoreSum = 0;
        let maxScoreSum = 0;
        student.submissions.forEach(function(submission){
            scoreSum += submission.score;
            maxScoreSum += submission.maxScore;
            returnObj[submission.assignment_id] = submission.score / submission.maxScore
        })
    returnObj.avg = scoreSum / maxScoreSum;
    returnArray.push(returnObj);
    
    })
  console.log(returnArray);
}

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)

//     // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];
  
//     return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);
  