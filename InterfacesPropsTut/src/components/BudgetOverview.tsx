import React from 'react';

import { BudgetItem } from './BudgetItem';
import Budget from './Interfaces';


/* This interface has one property, budgets, which 
is an array. Each element in this array should be 
of type Budget (defined in src/interfaces.ts).*/
interface BudgetProps {
          budgets: Budget[],
}



export const BudgetOverview: React.FC<BudgetProps> = ({budgets}: BudgetProps) => {
          return <div className="Budget-Overview">
                    <table>
                              <tbody>
                                        <tr className="Table-Header">
                                                  <td><h4>CATEGORY</h4></td>

                                                  <td><h4>BUDGETED</h4></td>

                                                  <td><h4>SPENT</h4></td>

                                                  <td><h4>REMAINING</h4></td>

                                        </tr>

                                        {
                                                  budgets.map(item => {
                                                            return <BudgetItem 
                                                                                budgeted={item.budgeted}
                                                                                spent={item.spent}
                                                                                category={item.category}

                                                                      >


                                                                      </BudgetItem>
                                                  })
                                        }
                              </tbody>
                    </table>
          </div>;
};
