import { mysqlTable, int, varchar, boolean } from "drizzle-orm/mysql-core";


export const GRADES = mysqlTable('grades', {
    id: int('id',{length:11}).primaryKey(),
    grade: varchar('grade', { length: 10 }).notNull()
});
export const Students = mysqlTable('students',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    name:varchar('name',{length:20}).notNull(),
    grade:varchar('grade',{length:10}).notNull(),
    address:varchar('address',{length:20}),
    contact:varchar('contact',{length:13}),

});
export const Attendence = mysqlTable('attendence',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    studentId:int ('studentId',{length:11}).notNull(),
    present:boolean('present').default(false),
    day:int('day',{length:11}).notNull(),
    date:varchar('date',{length:20}).notNull()
});