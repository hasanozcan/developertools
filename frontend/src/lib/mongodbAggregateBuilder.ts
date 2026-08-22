export function generateMongoAggregatePipeline(matchField: string, matchVal: string, groupField: string): string {
  const pipeline = [
    {
      $match: {
        [matchField]: matchVal,
      },
    },
    {
      $group: {
        _id: `$${groupField}`,
        totalCount: { $sum: 1 },
      },
    },
    {
      $sort: { totalCount: -1 },
    },
  ];

  return JSON.stringify(pipeline, null, 2);
}