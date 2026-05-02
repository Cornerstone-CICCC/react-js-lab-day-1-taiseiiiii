import type { User } from '../types';

type Props = {
  user: User | null;
};

const UserProfile = ({ user }: Props) => {
  if (!user) {
    return (
      <div className="user-profile">
        <h2>User Profile</h2>
        <p>Click <strong>View</strong> on a user to see their details.</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <dl>
        <dt>ID</dt>
        <dd>{user.id}</dd>
        <dt>Full Name</dt>
        <dd>{user.fullname}</dd>
        <dt>Age</dt>
        <dd>{user.age}</dd>
        <dt>Education</dt>
        <dd>{user.education || '-'}</dd>
        <dt>Gender</dt>
        <dd>{user.gender || '-'}</dd>
        <dt>Skills</dt>
        <dd>{user.skills.length > 0 ? user.skills.join(', ') : '-'}</dd>
        <dt>Bio</dt>
        <dd>{user.bio || '-'}</dd>
      </dl>
    </div>
  );
};

export default UserProfile;
