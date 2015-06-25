use test

db.grades.aggregate([
	{ $unwind: '$scores' }, 
	{ $match: { $or: [{'scores.type': 'exam'}, {'scores.type': 'homework'}] } },
	{ $group: { _id: { student_id: '$student_id', class_id: '$class_id' }, average_score: { $avg: '$scores.score' } } },
	/*{ $project: { class_id: 1, student_id: 1, average_score: 1 }},*/
	{ $group: { _id: { class_id: '$_id.class_id'}, average_for_class: { $avg: '$average_score'} } },
	{ $sort: { average_for_class: -1 } }

])

it
it
it