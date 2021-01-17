import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from '../../../../provider/firebase/firebase-admin';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);
  if (req.method === 'DELETE') {
    const {
      query: { uid },
    } = req;
    const getUid = typeof uid === 'string' ? uid : uid[0];
    firebaseAdmin
      .auth()
      .deleteUser(getUid)
      .then(() => {
        console.log('Successfully deleted user');
        res.status(200).json({ uid: getUid });
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
        res.status(500).json({ emess: error.message });
      });
  } else res.status(400).json({ mess: 'Wrong request method' });
};
