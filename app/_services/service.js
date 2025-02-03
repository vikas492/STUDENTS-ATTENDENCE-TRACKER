export const getUniqueRecord=(attandanceList)=>{
    const uniqueRecord=[];
    const existingUser = new Set();
    attandanceList?.forEach(record => {
        if(!existingUser.has(record.studentId)){
            existingUser.add(record.studentId);
            uniqueRecord.push(record);

        }
    });
    return uniqueRecord;
}